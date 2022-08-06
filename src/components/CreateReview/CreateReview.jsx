import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function CreateReview({ apiId, type, name }) {
  const [review, setReview] = useState({
    title: "",
    score: 0,
    description: "",
  });

  const history = useHistory();

  const [user, setUser] = useState("");

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        history.push("/login");
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios(
          `http://localhost:3001/api/back-end/users/perfil`,
          config
        );
        setUser(data);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    };
    autenticarUsuario();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/api/back-end/reviews/create", {
        apiId,
        type,
        name,
        title: review.title,
        score: review.score,
        description: review.description,
        userId: user.id,
      });
    } catch (err) {
      throw new Error("No pudimos crear tu review");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    console.log(`${e.target.name} : ${e.target.value}`);
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Crear reseña</h3>
      <input
        id="reviewTitle"
        type="text"
        placeholder="Título"
        name="title"
        onChange={handleChange}
      />
      <label>Calificación</label>
      <input
        type="range"
        id="reviewScore"
        name="score"
        min="0"
        max="5"
        step="1"
        onChange={handleChange}
      />
      <textarea
        name="description"
        id="reviewText"
        placeholder="¡Tu reseña!"
        rows="4"
        columns="50"
        onChange={handleChange}
      />
      <input type="submit" value="Crear reseña" />
    </form>
  );
}