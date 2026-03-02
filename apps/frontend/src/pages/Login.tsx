import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/register/Input";
import { Button } from "../components/register/Button";
import { User } from "../types";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { EyeClosed, Mail } from "lucide-react";

const Login: React.FC = () => {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			const response = await api.login({ email, password });
			login(response.user);
			navigate("/dashboard");
		} catch (err: any) {
			setError(err.message || "An unexpected error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="font-['Poppins'] text-[var(--light-text)] min-h-screen flex flex-col items-center justify-center gap-4 p-4 bg-[#000000] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url('/images/FondoHoster.webp')] bg-cover bg-center h-screen">
			{/* Logo + Hoster */}
			<div className="w-[570px] flex flex-col items-center ">
				<img
					src="/images/Hoster.svg"
					alt="Hoster"
					className="w-[63px] h-[63px] bg-[#fff] rounded-lg"
				/>
				<h1 className="text-[#f7f7ff] text-[36px] font-bold text-center">
					HOSTER
				</h1>
			</div>

			{/* contenedor principal */}
			<div className="w-full max-w-[570px]">
				<div className="bg-[var(--light-bg-center)] p-8 rounded-2xl">
					{/* Titulo bienvenida */}
					<div className="flex flex-col items-center mb-6 h-[135px] bg-[var(--light-bg-register)] -mx-8 -mt-8 pt-7 rounded-t-2xl">
						<h1 className="text-[32px] font-bold">¡Bienvenido!</h1>
						<p className="text-[16px]">
							Ingresa tus credenciales para acceder al dashboard
						</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-4">
						{error && (
							<div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-5 h-5"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
									/>
								</svg>
								{error}
							</div>
						)}

						<Input
							label="Email"
							placeholder="****@gmail.com"
							type="email"
							required
							disabled={isLoading}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							icon={<Mail size={25} strokeWidth={1.5} />}
						/>

						<Input
							label="Contraseña"
							placeholder="************"
							type="password"
							required
							disabled={isLoading}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							icon={<EyeClosed size={25} strokeWidth={1.5} />}
						/>

						<div className="flex items-center justify-between">
							<label className="flex items-center gap-2 cursor-pointer">
								<input
									type="checkbox"
									className="w-4 h-4 rounded border-slate-700 bg-[var(--light-bg-register)] text-[var(--light-accent)]  "
								/>
								<span>Recordar contrseña</span>
							</label>

							<button type="button" className="underline">
								Olvidé mi contraseña
							</button>
						</div>

						<Button
							type="submit"
							className="w-full font-['Poppins'] font-light"
							isLoading={isLoading}
						>
							Iniciar sesion
						</Button>
					</form>

					{/* footer Card */}
					<div className="mt-8 pt-6 text-center h-[67px] bg-[var(--light-bg-register)] -mx-8 -mb-8 rounded-b-2xl">
						<p className="text-[16px]">
							¿Todavía no sos un usuario?{" "}
							<Link to="/register" className="underline">
								REGISTRATE
							</Link>
						</p>
					</div>
				</div>

				<p className="p-2 text-center text-[var(--light-copyright)]">
					© 2026 Hoster. Todos los derechos reservados
				</p>
			</div>
		</div>
	);
};

export default Login;
