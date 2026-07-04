import { useState } from "react";

import { useRouter } from "expo-router";

import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { auth, db } from "../config/firebaseConfig";

export default function Index() {
  const router = useRouter();

  const [modo, setModo] = useState<"ingresar" | "crear">("ingresar");

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  const [cargando, setCargando] = useState(false);

  const cambiarModo = (nuevoModo: "ingresar" | "crear") => {
    setModo(nuevoModo);

    setNombre("");
    setCorreo("");
    setContrasena("");
    setConfirmarContrasena("");
  };

  const procesarFormulario = async () => {
    const nombreLimpio = nombre.trim();
    const correoLimpio = correo.trim().toLowerCase();

    if (modo === "ingresar") {
      if (correoLimpio === "" || contrasena === "") {
        Alert.alert("Aviso", "Completa el correo y la contraseña.");
        return;
      }
    } else {
      if (
        nombreLimpio === "" ||
        correoLimpio === "" ||
        contrasena === "" ||
        confirmarContrasena === ""
      ) {
        Alert.alert("Aviso", "Completa todos los campos.");
        return;
      }

      if (contrasena !== confirmarContrasena) {
        Alert.alert("Aviso", "Las contraseñas no coinciden.");
        return;
      }

      if (contrasena.length < 6) {
        Alert.alert("Aviso", "La contraseña debe tener al menos 6 caracteres.");
        return;
      }
    }

    try {
      setCargando(true);

      if (modo === "crear") {
        const credencial = await createUserWithEmailAndPassword(
          auth,
          correoLimpio,
          contrasena,
        );

        await setDoc(doc(db, "usuarios", credencial.user.uid), {
          nombre: nombreLimpio,
          correo: correoLimpio,
          rol: "cliente",
          fechaRegistro: serverTimestamp(),
        });

        /*
          Firebase inicia sesión automáticamente
          al crear una cuenta. La cerramos para que
          el usuario vuelva al formulario de ingreso.
        */
        await signOut(auth);

        Alert.alert(
          "Correcto",
          "Cuenta creada correctamente. Ahora puedes iniciar sesión.",
        );

        setNombre("");
        setCorreo("");
        setContrasena("");
        setConfirmarContrasena("");
        setModo("ingresar");
      } else {
        await signInWithEmailAndPassword(auth, correoLimpio, contrasena);

        setCorreo("");
        setContrasena("");

        router.replace("/inicio");
      }
    } catch (error: any) {
      console.log("Error de Firebase:", error.code);

      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Error", "Este correo ya está registrado.");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Error", "El correo ingresado no es válido.");
      } else if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        Alert.alert("Error", "El correo o la contraseña son incorrectos.");
      } else if (error.code === "auth/weak-password") {
        Alert.alert("Error", "La contraseña es demasiado débil.");
      } else if (error.code === "auth/network-request-failed") {
        Alert.alert(
          "Error",
          "No se pudo conectar con Firebase. Revisa tu conexión a Internet.",
        );
      } else {
        Alert.alert("Error", "No se pudo completar la operación.");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#C9342C" />

      <ScrollView
        contentContainerStyle={styles.contenido}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.encabezado}>
          <View style={styles.logo}>
            <Text style={styles.logoTexto}>陈</Text>
          </View>

          <Text style={styles.nombre}>EL CHINITO</Text>

          <Text style={styles.eslogan}>
            Sabor de casa, a un toque de distancia
          </Text>
        </View>

        <View style={styles.formulario}>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={modo === "ingresar" ? styles.tabActivo : styles.tab}
              onPress={() => cambiarModo("ingresar")}
              disabled={cargando}
            >
              <Text
                style={
                  modo === "ingresar" ? styles.tabActivoTexto : styles.tabTexto
                }
              >
                Ingresar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={modo === "crear" ? styles.tabActivo : styles.tab}
              onPress={() => cambiarModo("crear")}
              disabled={cargando}
            >
              <Text
                style={
                  modo === "crear" ? styles.tabActivoTexto : styles.tabTexto
                }
              >
                Crear cuenta
              </Text>
            </TouchableOpacity>
          </View>

          {modo === "crear" && (
            <>
              <Text style={styles.label}>Nombre completo</Text>

              <TextInput
                style={styles.input}
                placeholder="Ana Flores"
                placeholderTextColor="#9E9389"
                value={nombre}
                onChangeText={setNombre}
                editable={!cargando}
              />
            </>
          )}

          <Text style={styles.label}>Correo electrónico</Text>

          <TextInput
            style={styles.input}
            placeholder="ana.flores@gmail.com"
            placeholderTextColor="#9E9389"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={correo}
            onChangeText={setCorreo}
            editable={!cargando}
          />

          <Text style={styles.label}>Contraseña</Text>

          <TextInput
            style={styles.input}
            placeholder="Ingresa tu contraseña"
            placeholderTextColor="#9E9389"
            secureTextEntry
            value={contrasena}
            onChangeText={setContrasena}
            editable={!cargando}
          />

          {modo === "crear" && (
            <>
              <Text style={styles.label}>Confirmar contraseña</Text>

              <TextInput
                style={styles.input}
                placeholder="Repite tu contraseña"
                placeholderTextColor="#9E9389"
                secureTextEntry
                value={confirmarContrasena}
                onChangeText={setConfirmarContrasena}
                editable={!cargando}
              />
            </>
          )}

          {modo === "ingresar" && (
            <TouchableOpacity disabled={cargando}>
              <Text style={styles.olvidaste}>¿Olvidaste tu clave?</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              styles.botonIngresar,
              cargando && styles.botonDeshabilitado,
            ]}
            onPress={procesarFormulario}
            disabled={cargando}
          >
            {cargando ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.botonIngresarTexto}>
                {modo === "ingresar" ? "Ingresar" : "Crear cuenta"}
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.separador}>
            <View style={styles.linea} />

            <Text style={styles.separadorTexto}>o continúa con</Text>

            <View style={styles.linea} />
          </View>

          <View style={styles.botonesSociales}>
            <TouchableOpacity style={styles.botonGoogle} disabled={cargando}>
              <Text style={styles.socialTexto}>G Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botonApple} disabled={cargando}>
              <Text style={styles.socialTexto}>● Apple</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C9342C",
  },

  contenido: {
    flexGrow: 1,
  },

  encabezado: {
    backgroundColor: "#C9342C",
    alignItems: "center",
    paddingTop: 55,
    paddingBottom: 35,
    paddingHorizontal: 20,
  },

  logo: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: "#FFF9F1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  logoTexto: {
    fontSize: 38,
    color: "#C9342C",
    fontWeight: "bold",
  },

  nombre: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "bold",
  },

  eslogan: {
    color: "#FFE9E2",
    fontSize: 13,
    marginTop: 6,
  },

  formulario: {
    flex: 1,
    backgroundColor: "#FFF9F1",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 35,
  },

  tabs: {
    flexDirection: "row",
    backgroundColor: "#F3EBDD",
    borderRadius: 12,
    padding: 4,
    marginBottom: 25,
  },

  tabActivo: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    paddingVertical: 12,
    alignItems: "center",
    elevation: 2,
  },

  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },

  tabActivoTexto: {
    color: "#C9342C",
    fontWeight: "bold",
  },

  tabTexto: {
    color: "#5C4C42",
    fontWeight: "600",
  },

  label: {
    color: "#5B4B42",
    fontSize: 13,
    marginBottom: 7,
  },

  input: {
    height: 53,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DFD0BC",
    borderRadius: 13,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#2D211B",
    marginBottom: 17,
  },

  olvidaste: {
    color: "#C9342C",
    fontSize: 13,
    textAlign: "right",
    marginBottom: 20,
  },

  botonIngresar: {
    height: 52,
    backgroundColor: "#C9342C",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },

  botonDeshabilitado: {
    opacity: 0.7,
  },

  botonIngresarTexto: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  separador: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 23,
  },

  linea: {
    flex: 1,
    height: 1,
    backgroundColor: "#DED2C1",
  },

  separadorTexto: {
    color: "#AA9B8C",
    fontSize: 12,
    marginHorizontal: 12,
  },

  botonesSociales: {
    flexDirection: "row",
  },

  botonGoogle: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#DFD0BC",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginRight: 8,
  },

  botonApple: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#DFD0BC",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginLeft: 8,
  },

  socialTexto: {
    color: "#2D211B",
    fontWeight: "600",
  },
});
