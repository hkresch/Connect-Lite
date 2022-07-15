

const User = ({id, name}) => {
    return (
        <div>
            id: {id}, title: {title}
        </div>
    )
}

export default User;


// query Users {
//     users {
//       name
//       shows {
//         name
//       }
//     }
//   }