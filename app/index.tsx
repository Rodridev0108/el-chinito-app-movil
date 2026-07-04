import { useState } from "react";
import {
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

export default function Index() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const iniciarSesion = () => {
    if (correo === "" || contrasena === "") {
      Alert.alert("Aviso", "Completa el correo y la contraseña.");
      return;
    }

    Alert.alert("Correcto", "Datos ingresados correctamente.");
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
            <TouchableOpacity style={styles.tabActivo}>
              <Text style={styles.tabActivoTexto}>Ingresar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabTexto}>Crear cuenta</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Correo o celular</Text>

          <TextInput
            style={styles.input}
            placeholder="ana.flores@gmail.com"
            placeholderTextColor="#9E9389"
            keyboardType="email-address"
            autoCapitalize="none"
            value={correo}
            onChangeText={setCorreo}
          />

          <Text style={styles.label}>Contraseña</Text>

          <TextInput
            style={styles.input}
            placeholder="Ingresa tu contraseña"
            placeholderTextColor="#9E9389"
            secureTextEntry
            value={contrasena}
            onChangeText={setContrasena}
          />

          <TouchableOpacity>
            <Text style={styles.olvidaste}>¿Olvidaste tu clave?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botonIngresar}
            onPress={iniciarSesion}
          >
            <Text style={styles.botonIngresarTexto}>Ingresar</Text>
          </TouchableOpacity>

          <View style={styles.separador}>
            <View style={styles.linea} />
            <Text style={styles.separadorTexto}>o continúa con</Text>
            <View style={styles.linea} />
          </View>

          <View style={styles.botonesSociales}>
            <TouchableOpacity style={styles.botonGoogle}>
              <Text style={styles.socialTexto}>G Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botonApple}>
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
