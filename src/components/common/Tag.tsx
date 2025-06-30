type TagProps = {
  text: string;
};

const Tag = ({ text }: TagProps) => {
  return <div className="text-xs bg-gray-100 p-2 rounded-md">#{text}</div>;
};

export default Tag;
