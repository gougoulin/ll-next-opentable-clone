"use client";

const error = ({ error }: { error: Error }) => {
  return (
    <div>
      <p>{error.message}</p>
      <p>{error.stack}</p>
    </div>
  );
};
export default error;
