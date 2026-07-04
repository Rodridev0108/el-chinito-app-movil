import { useEffect, useState } from "react";
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../config/firebaseConfig";

export default function Inicio() {
  const router = useRouter();

  const [nombre, setNombre] = useState("Cliente");

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const usuarioActual = auth.currentUser;

        if (!usuarioActual) {
          router.replace("/");
          return;
        }

        const referenciaUsuario = doc(db, "usuarios", usuarioActual.uid);

        const documentoUsuario = await getDoc(referenciaUsuario);

        if (documentoUsuario.exists()) {
          const datos = documentoUsuario.data();

          setNombre(datos.nombre || "Cliente");
        }
      } catch (error) {
        console.log("Error al cargar el usuario:", error);
      }
    };

    cargarUsuario();
  }, [router]);

  const cerrarSesion = async () => {
    try {
      await signOut(auth);

      router.replace("/");
    } catch (error) {
      Alert.alert("Error", "No se pudo cerrar la sesión.");

      console.log("Error al cerrar sesión:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#C9342C" />

      <View style={styles.encabezado}>
        <View>
          <Text style={styles.saludo}>Hola, {nombre}</Text>

          <Text style={styles.subtitulo}>¿Qué deseas pedir hoy?</Text>
        </View>

        <TouchableOpacity style={styles.botonSalir} onPress={cerrarSesion}>
          <Text style={styles.botonSalirTexto}>Salir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contenido}>
        <View style={styles.banner}>
          <Text style={styles.bannerTitulo}>El sabor de siempre</Text>

          <Text style={styles.bannerTexto}>
            Disfruta nuestros platos y realiza tu pedido desde la aplicación.
          </Text>

          <TouchableOpacity
            style={styles.botonCarta}
            onPress={() => router.push("/carta")}
          >
            <Text style={styles.botonCartaTexto}>Ver carta</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.tituloSeccion}>Accesos rápidos</Text>

        <View style={styles.opciones}>
          <TouchableOpacity
            style={styles.opcion}
            onPress={() => router.push("/carta")}
          >
            <Text style={styles.opcionIcono}>🍽️</Text>

            <Text style={styles.opcionTexto}>Carta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.opcion}
            onPress={() =>
              Alert.alert(
                "Próximamente",
                "Los pedidos se implementarán más adelante.",
              )
            }
          >
            <Text style={styles.opcionIcono}>🧾</Text>

            <Text style={styles.opcionTexto}>Mis pedidos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.opcion}
            onPress={() =>
              Alert.alert(
                "Próximamente",
                "Los locales se implementarán más adelante.",
              )
            }
          >
            <Text style={styles.opcionIcono}>📍</Text>

            <Text style={styles.opcionTexto}>Locales</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F1",
  },

  encabezado: {
    backgroundColor: "#C9342C",
    paddingHorizontal: 22,
    paddingTop: 25,
    paddingBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  saludo: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "bold",
  },

  subtitulo: {
    color: "#FFE9E2",
    fontSize: 14,
    marginTop: 5,
  },

  botonSalir: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },

  botonSalirTexto: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  contenido: {
    flex: 1,
    padding: 20,
  },

  banner: {
    backgroundColor: "#F4E5D3",
    borderRadius: 18,
    padding: 22,
    marginBottom: 28,
  },

  bannerTitulo: {
    color: "#3B2921",
    fontSize: 22,
    fontWeight: "bold",
  },

  bannerTexto: {
    color: "#6C5A50",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 20,
  },

  botonCarta: {
    backgroundColor: "#C9342C",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
  },

  botonCartaTexto: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },

  tituloSeccion: {
    color: "#3B2921",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  opciones: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  opcion: {
    width: "31%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6D8C7",
    borderRadius: 15,
    alignItems: "center",
    paddingVertical: 18,
  },

  opcionIcono: {
    fontSize: 27,
    marginBottom: 8,
  },

  opcionTexto: {
    color: "#4F3E35",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});
