"use client";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import '@ant-design/v5-patch-for-react-19';
import { Provider } from "react-redux";
import { store } from "../providers/store";

const inter = Inter({ subsets: ["latin"] });

export function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Provider store={store}>
					<AntdRegistry>{children}</AntdRegistry>
				</Provider>
			</body>
		</html>
	);
}
