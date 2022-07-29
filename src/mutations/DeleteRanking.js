import { gql, useQuery, useMutation } from "@apollo/client"
import { GET_USER } from "../queries/GetUser"




export const DELETE_RANKING = gql`
mutation DELETE_RANKING($where: USERWhere, $disconnect: USERDisconnectInput) {
    updateUsers(where: $where, disconnect: $disconnect) {
      info {
        relationshipsDeleted
      }
    }
  }`

const DeleteRanking =  (name, showName, ranking) => {

    const [DeleteRanking] = useMutation(DELETE_RANKING, {
        update(cache, { data: {value}}) {
            cache.writeQuery({
                query: GET_USER,
                variables: {users: name}, //need to add the show as input
                data : {ranking: [value]} //set the edge ranking 

            })
        }
    }  )}



        

export default DeleteRanking;
        