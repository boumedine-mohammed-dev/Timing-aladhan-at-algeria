import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
export default function Prayer({ img, salat, time }) {
    return (
        <div  >
            <Card >
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="180"
                    image={img}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" >
                        {salat}
                    </Typography>
                    <Typography variant="h1" >
                        {time}
                    </Typography>
                </CardContent>
            </Card>
        </div>

    );
}