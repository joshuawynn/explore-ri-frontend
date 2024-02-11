const User = ({ user }) => {
    return (
      <div>
          <h1>User</h1>
          {user.map(user => (
              <>  
                  <h2>{user.name}</h2>
                  </>
          ))}
      </div>
    )
  }
  
  export default User