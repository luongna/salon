import CommentForm from "./CommentForm";
import styles from './Comment.module.scss';
import classNames from 'classnames/bind';
import avatar from '~/assets/images/avatarDefault.jpg'
const cx = classNames.bind(styles);
const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  // parentId ,
  currentUserId,
  getReplies,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const canDelete =
    currentUserId === comment.userId ;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId ;
  const replyId =  comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();

  return (
    <div key={comment.id} className={cx('comment')} >
      <div className= {cx('comment-image-container')}>
        <img src={avatar} alt="avatar comment"/>
      </div>
      
      <div className={cx('comment-right-part')}>
        <div className={cx('comment-content')}>
          <div className={cx('comment-author')}>{comment.username}</div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && <div className={cx('comment-text')}>{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <div className={cx('comment-actions')}>
          {canReply && (
            <div
              className={cx('comment-action')}
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className={cx('comment-action')}
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className={cx('comment-action')}
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className= {cx('replies')}>
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                // parentId={comment.id}
                replies={getReplies(reply.id)}
                currentUserId={currentUserId}
                getReplies = {getReplies}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
