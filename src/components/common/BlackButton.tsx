type BlackButtonProps = {
  text: string;
  handleClick?: () => void;
  disabled?: boolean;
};

const BlackButton = (props: BlackButtonProps) => {
  return (
    <button
      type="submit"
      onClick={props.handleClick}
      disabled={props.disabled}
      className={`w-full cursor-pointer rounded-md bg-black py-3 px-4 border border-transparent text-center text-base text-white transition-all shadow-md hover:shadow-lg focus:bg-neutral-700 focus:shadow-none active:bg-neutral-700 hover:bg-neutral-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
    >
      {props.text}
    </button>
  );
};

export default BlackButton;
