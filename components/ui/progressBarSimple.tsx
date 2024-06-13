interface Props {
  percentage: string;
}
const ProgressBarSimple = ({ percentage }: Props) => {
  return (
    <>
      <div className="w-full flex mr-auto">
        <div
          className={
            "inline-flex mb-2 py-0.5 px-1.5 bg-blue-50 border border-blue-200 text-xs font-medium text-blue-600 rounded-lg dark:bg-blue-800/30 dark:border-blue-800 dark:text-blue-500"
          }
          style={{
            marginInlineStart:
              Number(percentage) >= 1
                ? `calc(${percentage}% - 1.25rem)`
                : percentage + "%",
          }}
        >
          {percentage}
          {"%"}
        </div>
      </div>
      <div
        className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
        role="progressbar"
        aria-valuenow={Number(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </>
  );
};

export { ProgressBarSimple };
