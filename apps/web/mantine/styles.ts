import {
  type MantineThemeComponents,
  PasswordInput,
  TextInput,
  Title,
  Text
} from "@mantine/core";

export const styles: MantineThemeComponents = {
  TextInput: TextInput.extend({
    styles(theme) {
      return {
        input: {
          ":focus": {
            borderColor: theme.colors.indigo[6]
          }
        },
        required: {
          color: "red"
        }
      };
    }
  }),
  PasswordInput: PasswordInput.extend({
    styles(theme) {
      return {
        input: {
          ":focus": {
            borderColor: theme.colors.indigo[6]
          }
        },
        required: {
          color: theme.colors.red[6]
        }
      };
    }
  }),
  Title: Title.extend({
    defaultProps: {
      order: 2,
      c: "white"
    }
  }),
  Text: Text.extend({
    defaultProps: {
      c: "white"
    }
  })
};
