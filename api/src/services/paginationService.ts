import { Model, PipelineStage } from "mongoose";

type TPageProps = {
  page: number;
  limit: number;
};

type PaginationResponse = {
  nextPage?: TPageProps;
  prevPage?: TPageProps;
  totalPages: number;
  totalDocuments: number;
  data: any[];
};

type PaginationFunction = (
  model: Model<any>,
  page: number,
  limit: number,
  aggrArray?: PipelineStage[]
) => Promise<PaginationResponse>;

export const paginationService: PaginationFunction = async (
  model,
  page = 1,
  limit = 5,
  aggrArray
) => {
  const docsToSkip = (page - 1) * limit;
  let data = [];
  let totalDocuments = 0;

  if (aggrArray && aggrArray.length > 0) {
    const [result] = await model
      .aggregate([
        ...aggrArray,
        {
          $facet: {
            data: [{ $skip: docsToSkip }, { $limit: limit }],
            totalDocuments: [{ $count: "count" }],
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ])
      .exec();

    totalDocuments = result.totalDocuments[0].count || 0;
    data = result.data;
  } else {
    totalDocuments = await model.countDocuments();
    data = await model.find().limit(limit).skip(docsToSkip).exec();
  }

  return {
    data,
    totalDocuments,
    totalPages: Math.ceil(totalDocuments / limit),
    nextPage:
      docsToSkip + limit < totalDocuments
        ? { limit, page: page + 1 }
        : undefined,

    prevPage: page > 1 ? { page: page + 1, limit } : undefined,
  };
};
