export const useStyles = () => ({
  baseChipLabel: (theme) => ({
    color: theme.palette.common.black,
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    '& .MuiChip-deleteIcon': {
      color: theme.palette.common.black,
      opacity: 0.5,
      '&:hover': {
        color: theme.palette.common.black,
      },
    },
    '& .MuiChip-label': {
      fontSize: '0.8125rem',
      fontWeight: 400,
      padding: '0 10px',
    },
  }),
});
