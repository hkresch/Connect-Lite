import { gql, useQuery, useMutation } from "@apollo/client"
import { GET_USER } from "../queries/GetUser"
import React from "react"
import { useAuth } from "../contexts/UserAuth"


export const ADD_RANKING = gql`
mutation ADD_RANKING($where: USERWhere, $connect: USERConnectInput) {
  updateUsers(where: $where, connect: $connect) {
    info {
      relationshipsCreated
    }
  }
}


`

const AddRanking =  (name, email, showName, ranking) => {

    const [AddRanking] = useMutation(ADD_RANKING, {
        update(cache, { data: {value}}) {
            cache.writeQuery({
                query: GET_USER,
                variables: {users: name}, //need to add the show as input
                data : {ranking: [value]} //set the edge ranking 

            })
        }
    }  )}

/*     AddRanking (
        {variables:{
            "where": {
              "name": name
            },
            "connect": {
              "shows": [
                {
                  "where": {
                    "node": {
                      "name": showName                    
                    }
                  },
                  "edge": {
                    "ranking": ranking
                  }
                }
              ]
            }
          }
          }
    )
        }
         */

        

export default AddRanking;
        

 