interface InesrtBoxProps {
  str: string;
  placeholder?: string;
}

const InsertBox: React.FC<InesrtBoxProps> = ({ str, placeholder="" }) => {
  return(
    <>
      <div>
        <span>{str}</span>
        <input type="text" placeholder={placeholder}/>
      </div>
    </>
  );
};

export default InsertBox;