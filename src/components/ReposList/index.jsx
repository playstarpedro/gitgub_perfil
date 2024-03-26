import { useEffect, useState } from "react";

import styles from './ReposList.module.css'

const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [estaCarregando, setEstaCarregando] = useState(true)
    const [deuErro, setDeuErro] = useState(false)

    useEffect(() => {
        setDeuErro(false)
        setEstaCarregando(true);
        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
            .then(res => {
                if (res.status !== 200) { setDeuErro(true) }
                else {
                    return res.json();
                }
            })
            .then(resJson => {
                setTimeout(() => {
                    setEstaCarregando(false)
                    setRepos(resJson)
                }, 1000)
            })
    }, [nomeUsuario])

    if (deuErro === true) {
        return (
            <div className="container">
                <h2>O usuário não foi encontrado, por favor digite novamente.</h2>
            </div>
        )
    } else {
        return (
            <div className="container">
                {estaCarregando ? (
                    <h1>Carregando...</h1>
                ) : (
                    <ul className={styles.list}>
                        {repos.map(({ id, name, language, html_url }) => (
                            <li className={styles.listItem} key={id}>
                                <div className={styles.itemName}>
                                    <b>Nome:</b>
                                    {name}
                                </div>
                                <div className={styles.itemLanguage}>
                                    <b>Linguagem:</b>
                                    {language}
                                </div>
                                <a className={styles.itemLink} target="_blank" href={html_url}>Visitar no GitHub</a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        )
    }

}

export default ReposList;