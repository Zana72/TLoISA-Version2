import axios from "axios";

export const fetchData = async (kind) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/api/${kind}`,
      config
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
