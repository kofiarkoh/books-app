import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import LinearProgress from "@mui/material/LinearProgress";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {Book} from "../redux/booksSlice";
import {useAppDispatch} from "../redux/store";

type Props = {
	book: Book;
};

export default function BookItem(props: Props) {
	const {title, description, author_name} = props.book;
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const closeTaskStatusMenu = () => {
		setAnchorEl(null);
	};

	return (
		<Box sx={{width: "100%"}}>
			<Card
				variant="outlined"
				sx={{
					width: "100%",
					sheight: "400px",
					display: "flex",
					flexDirection: "column",
				}}>
				{loading && <LinearProgress />}
				<CardContent>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}>
						<Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
							By {author_name}
						</Typography>
					</div>
					<Typography variant="h5" component="div" sx={{my: 2}}>
						{title}
					</Typography>

					<Typography variant="body2">{description}</Typography>
				</CardContent>
				<CardActions sx={{flexDirection: "row", justifyContent: "flex-end"}}>
					<Button size="small" color="error" onClick={null}>
						Delete
					</Button>
					<Button size="small" onClick={null}>
						Edit
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
}
