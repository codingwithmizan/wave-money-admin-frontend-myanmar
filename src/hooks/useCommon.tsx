import { useState } from "react";

export const useCommon = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleModalVisible = () => {
    setIsModalVisible(!isModalVisible);
  };

  return { isModalVisible, loading, setLoading, toggleModalVisible };
};
