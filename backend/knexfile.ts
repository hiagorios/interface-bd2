const knexConfig = {
    client: "postgresql",
    connection: {
      database: "uesc_eventos",
      user: "organizador",
      password: "0rg4n1z4d0r"
    },
    pool: {
      min: 2,
      max: 10
    }

};

export default knexConfig;
