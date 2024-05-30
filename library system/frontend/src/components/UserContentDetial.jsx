export const UserContentDetial = (props) => {

    return (
        <div  {...props.user.id}>
            <p><strong>UserContentDetial</strong> </p>
            {props.user.name}
        </div>
    );
}
