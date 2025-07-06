type WhiteButtonProps = {
  text: string;
  handleClick?: () => void;
  disabled?: boolean;
};

const WhiteButton = (props: WhiteButtonProps) => {
  return (
    <button
      type="submit"
      onClick={props.handleClick}
      disabled={props.disabled}
      className={`w-full cursor-pointer rounded-md bg-white py-3 px-4 border border-transparent text-center text-base text-neutral-800 transition-all shadow-md hover:shadow-lg focus:bg-gray-100 focus:shadow-none active:bg-gray-100 hover:bg-gray-100 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
    >
      {props.text}
    </button>
  );
};

export default WhiteButton;
