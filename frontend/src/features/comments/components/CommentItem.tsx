import {Grid, Typography} from '@mui/material';
import {CommentsData} from '../../../types';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from 'react';

interface Props {
  comment: CommentsData;
}

const CommentItem: React.FC<Props> = ({comment}) => {
  return (
    <Grid container sx={{borderBottom: '1px solid #eee', pb: 2, mb: 2}}>
      <Typography gutterBottom display="flex" alignItems="center" marginBottom="15px" variant="body1">
        <AccountCircleIcon/>&nbsp;<b>{comment.user.username}</b>&nbsp;оставил комментарий:
      </Typography>

      <Grid item xs={12}>
        <Typography gutterBottom variant="body2" color="text.secondary" sx={{flexGrow: 1}}>
          {comment.text}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CommentItem;