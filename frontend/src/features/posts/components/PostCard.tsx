import React from 'react';
import {PostsData} from '../../../types';
import noImage from '../../../assets/images/no-image.png';
import {Box, Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import {API_URL} from '../../../config';

interface Props {
  post: PostsData;
}

const PostCard: React.FC<Props> = ({post}) => {
  const imageUrl = post.image ? `${API_URL}/${post.image}` : noImage;

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #E0E0E0',
        borderRadius: 2,
        boxShadow: 'none',
        padding: 1,
        width: '100%',
        marginBottom: 1,
        backgroundColor: '#fff',
        '&:hover': {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        },
      }}>
      <CardMedia
        component="img"
        sx={{
          width: 120,
          height: 120,
          borderRadius: 1,
          marginRight: 4,
          objectFit: 'cover',
        }}
        image={imageUrl}
        alt="post image"
      />
      <CardContent sx={{ padding: '8px 0', flex: 1 }}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography variant="body1" color="textSecondary" fontWeight="bold">
              Опубликовано: {dayjs(post.datetime).format('DD.MM.YYYY HH:mm')} / Автор: {post.user.username}
            </Typography>
          </Grid>
          <Grid item>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography component={Link} sx={{color: '#ff4500', '&:hover': {color: '#da3d02'}}} to={`/full-post/${post._id}`}>
                {post.title}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PostCard;