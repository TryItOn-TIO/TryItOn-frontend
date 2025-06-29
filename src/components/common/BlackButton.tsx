type BlackButtonProps = {
  text: string;
  handleClick?: () => void;
};

const BlackButton = (props: BlackButtonProps) => {
  return (
    <button
      type="submit"
      onClick={props.handleClick}
      className={`w-full cursor-pointer rounded-md bg-black py-3 px-4 border border-transparent text-center text-base text-white transition-all shadow-md hover:shadow-lg focus:bg-gray-100 focus:text-black focus:shadow-none active:bg-gray-100 hover:bg-gray-100 hover:text-black active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
    >
      {props.text}
    </button>
  );
};

export default BlackButton;
