import { Box, Text } from '@mantine/core';

export default function Footer() {
  return (
    <Box
    //   component="footer"
    //   mt="xl"
    //   py="md"
    //   px="md"
    //   sx={(theme) => ({
    //     backgroundColor: theme.colors.gray[0],
    //     borderTop: `1px solid ${theme.colors.gray[3]}`,
    //     textAlign: 'center',
    //   })}
    >
      <Text size="sm">© {new Date().getFullYear()} Martha's Projects</Text>
    </Box>
  );
}
