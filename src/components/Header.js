import { Box, Container, Title } from '@mantine/core';

export default function Header() {
  return (
    <Box
    //   component="header"
    //   py="md"
    //   px="md"
    //   sx={(theme) => ({
    //     backgroundColor: theme.colors.gray[0],
    //     borderBottom: `1px solid ${theme.colors.gray[3]}`,
    //   })}
    >
      <Container>
        <Title order={2}>Weather in the World</Title>
      </Container>
    </Box>
  );
}
