import React, { useContext, useEffect } from 'react'
import { Menubar } from 'primereact/menubar'
import axios from 'axios';
import { UserContext } from '../UserContext'
import { Navigate, useNavigate, } from 'react-router-dom'

function Header() {
    const navigate = useNavigate();
    const { user, setUser, ready } = useContext(UserContext);
    
    const items = [];
    items.push({
      label: 'Home',
      icon: 'pi pi-fw pi-power-off',
      command: () => {
        
          navigate('/');
        
      }
    });
    if (user) {
        // User is logged in
        items.push(
          {
            label: (
              <span >
                My Arts
              </span>
            ),
            command: () => {
              navigate('/myauctions');
            },
          },
          )
        if(user.user_type == 'artist'){
          items.push(
            {
              label: (
                <span style={{ fontWeight: 'bold', color: 'rgb(79, 86, 223)' }}>
                  Add your art for auction
                </span>
              ),
              command: () => {
                navigate('/addauction');
              },
            },
            )
        }else{
          items.push(
            {
              label: (
                <span style={{ fontWeight: 'bold', color: 'rgb(79, 86, 223)' }}>
                 Become an artist
                </span>
              ),
              command: () => {
                navigate('/artistregistration');
              },
            },
            )
        }
        
      } else {
        // User is not logged in
        items.push({
          label: 'Register',
          icon: 'pi pi-fw pi-calendar',
          command: () => {
            navigate('/register');
          }
        });
      }
      
      items.push({
        label: user ? 'Logout' : 'Login',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
          if (user) {
            logout();
          } else {
            navigate('/login');
          }
        }
      });
      
      
      
      
      
      
      

    const start = <img alt="logo" src="../logo.png" height="10" className="mr-2 logo-image"></img>;

    async function logout() {
        await axios.post('/api/user/logout');
        setUser(null);
        window.location.reload();
    }


    return (

        <div className="">
            <Menubar model={items} start={start}  />
        </div>
    )
}

export default Header;