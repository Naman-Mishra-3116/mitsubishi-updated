import { modals } from "@mantine/modals";
import MTypography from "../MTypography/MTypography";

export type Props = {
  msg: string;
  title: string;
  labels?: { confirm: string; cancel: string };
  onConfirm?: () => void;
};

export const confirmationAlert = ({
  labels = { cancel: "Cancel", confirm: "Confirm" },
  title = "Are you sure you want to continue?",
  ...data
}: Props): Promise<boolean> => {
  return new Promise((resolve) => {
    modals.openConfirmModal({
      title: (
        <MTypography
          variant="descriptionMedium"
          text={title}
          fontWeight={600}
          color="black"
          fontSize="20px"
        />
      ),
      centered: true,
      children: (
        <MTypography
          text={data.msg}
          fontWeight={400}
          fontSize="15px"
          variant="description"
        />
      ),
      labels: labels,
      confirmProps: { color: "red" },
      onConfirm: () => {
        resolve(true);
      },
      onCancel: () => {
        resolve(false);
      },
    });
  });
};
