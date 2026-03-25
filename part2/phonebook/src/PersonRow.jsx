const PersonRow = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

export default PersonRow;
