type CommentFormProps = {
  comment: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
};

const CommentForm = ({
  comment,
  onChange,
  onSubmit,
  isSubmitting,
}: CommentFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onSubmit();
  };

  return (
    <div className="w-full px-4 py-2 bg-[rgba(255,255,255,0.9)] border-t border-gray-200 z-50">
      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="댓글을 입력해주세요"
          value={comment}
          onChange={(e) => onChange(e.target.value)}
          disabled={isSubmitting}
          className="flex-grow px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "등록 중..." : "등록"}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
