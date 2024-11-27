import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useForm from "../../Hooks/useForm"
import useFormValidation from "../../Hooks/useFormValidation"
import { getUnauthenticatedHeaders, PUT } from "../../fetching/http.fetching"

const ResetPassword = () => {
  const { reset_token } = useParams();
  const navigate = useNavigate()
  const { form_values_state, handleChangeInputValue } = useForm({
      password: "",
  });

  const { validateForm } = useFormValidation(form_values_state, {
      validatePassword: true,
      validatePasswordComplexity: true,
  });

  const [formErrorsState, setFormErrorsState] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validación en tiempo real
  useEffect(() => {
      const errors = validateForm();
      setFormErrorsState(errors);
  }, [form_values_state]);

  const handleSubmitResetPasswordForm = async (event) => {
      event.preventDefault();

      if (isSubmitting) return;

      setIsSubmitting(true);
      setFormErrorsState({});
      setSuccessMessage("");

      const errors = validateForm();
      if (Object.keys(errors).length > 0) {
          setFormErrorsState(errors);
          setIsSubmitting(false);
          return;
      }

      try {
          const response = await PUT(
              `${import.meta.env.VITE_URL_BACK}/api/auth/reset-password/${reset_token}`,
              {
                  body: form_values_state,
                  headers: getUnauthenticatedHeaders(),
              }
          );

          if (response.payload?.errors) {
              setFormErrorsState(response.payload.errors);
          } 
          else {
              setSuccessMessage("Tu contraseña ha sido restablecida correctamente. Serás redirigido a inicio de sesión en segundos")
                setTimeout(() => {
                  navigate('/login')
              }, 6000)
          }
      } 
      catch (error) {
          console.error("Error al enviar la solicitud de restablecimiento de contraseña", error);
      } 
      finally {
          setIsSubmitting(false);
      }
  };

  return (
      <div>
          <h1>Restablecer contraseña</h1>
          <p>Introduce tu nueva contraseña para restablecerla.</p>
          <form onSubmit={handleSubmitResetPasswordForm}>
              <div>
                  <label htmlFor="password">Nueva contraseña:</label>
                  <input
                      name="password"
                      id="password"
                      type="password"
                      placeholder="Ingrese nueva contraseña"
                      value={form_values_state.password}
                      onChange={handleChangeInputValue}
                      disabled={isSubmitting}
                  />
                  {formErrorsState.password && Array.isArray(formErrorsState.password) && (
                      <div className="error">
                          {formErrorsState.password.map((error, index) => (
                              <p key={index}>{error}</p>
                          ))}
                      </div>
                  )}
              </div>
              <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Restableciendo contraseña..." : "Restablecer contraseña"}
              </button>
          </form>
          {successMessage && <span>{successMessage}</span>}
          <span>
              ¿Recuerdas tu contraseña? <a href="/login">Iniciar sesión</a>
          </span>
      </div>
  );
};

export default ResetPassword