import { Spin } from "antd";
export const LoadingSpiner = () => {
  return (
    <div className="h-screen w-screen flex justify-center mt-48">
      <Spin size="large" />
    </div>
  );
};
