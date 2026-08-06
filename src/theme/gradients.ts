import { colors } from "./colors";

export const gradients = {
  primary: `linear-gradient(
        135deg,
        ${colors.primary},
        ${colors.secondary}
    )`,

  ageChart: {
    start: colors.secondary,
    end: colors.primary,
  },

  root: {
    start: "#ff86e8",
    end: colors.role.ROOT,
  },

  admin: {
    start: "#9985ff",
    end: colors.role.ADMIN,
  },
};
