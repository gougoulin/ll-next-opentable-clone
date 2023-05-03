"use client";

const Error = ({ error }: { error: Error }) => {
  return (
    <div>
      <p>{error.message}</p>
      <p>{error.stack}</p>
    </div>
  );
};
export default Error;
