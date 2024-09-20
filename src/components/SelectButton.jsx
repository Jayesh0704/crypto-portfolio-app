import { styled } from '@mui/material/styles';

const SelectButton = ({ children, selected, onClick }) => {
  const StyledButton = styled('span')(({ theme }) => ({
    borderRadius: "5px",
    border: "1px solid #30c0bf", // Use primary color
    backgroundColor: selected ? "#30c0bf" : "transparent",
    color: selected ? "#fff" : "#30c0bf",
    fontWeight: 700,
    padding: "10px 24px",
    "&:hover": {
      backgroundColor: selected ? "#28a79d" : "#30c0bf",
      color: "#fff",
    },
  
    width: '22%',
  }));

  return (
    <StyledButton onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default SelectButton;
