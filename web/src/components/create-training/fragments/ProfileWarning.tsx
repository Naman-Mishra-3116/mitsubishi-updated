import React, { memo } from "react";
import { Box, Text, Container, Paper, Title } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

const ProfileWarning: React.FC = () => {
  return (
    <Container
      size="md"
      h="80vh"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper shadow="md" p="xl" radius="md" withBorder>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <IconAlertCircle size={48} color="#fa5252" />
          <Title order={3} mt="md" mb="xs">
            Complete College Profile Required
          </Title>
          <Text color="dimmed">
            Please complete your college profile to create a training. This is
            necessary because:
          </Text>
          <Box mt="sm" style={{ textAlign: "center", width: "100%" }}>
            <Text size="md">
              Trainings can only be <strong>approved</strong> when the profile
              is complete.
              <br />Certificates can only be <strong>generated</strong> when
              required details are filled in.
            </Text>
            <Text size="md">
              Required details include: <strong>College Logo,</strong>
              <strong> Coordinator and Director Signature.</strong>
            </Text>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default memo(ProfileWarning);
