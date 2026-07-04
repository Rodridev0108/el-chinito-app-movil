import { useEffect, useState } from "react";

import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../config/firebaseConfig";

type Plato = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  disponible: boolean;
  emoji: string;
};

export default function Carta() {
  const router = useRouter();

  const [platos, setPlatos] = useState<Plato[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerPlatos = async () => {
      try {
        const consulta = await getDocs(collection(db, "platos"));

        const lista: Plato[] = consulta.docs.map((documento) => {
          const datos = documento.data();

          return {
            id: documento.id,
            nombre: datos.nombre,
            descripcion: datos.descripcion,
            precio: datos.precio,
            categoria: datos.categoria,
            disponible: datos.disponible,
            emoji: datos.emoji,
          };
        });

        const platosDisponibles = lista.filter((plato) => plato.disponible);

        setPlatos(platosDisponibles);
      } catch (error) {
        console.log("Error al obtener los platos:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerPlatos();
  }, []);

  const mostrarPlato = ({ item }: { item: Plato }) => {
    return (
      <View style={styles.tarjeta}>
        <View style={styles.imagen}>
          <Text style={styles.emoji}>{item.emoji}</Text>
        </View>

        <View style={styles.informacion}>
          <Text style={styles.nombre}>{item.nombre}</Text>

          <Text style={styles.descripcion} numberOfLines={2}>
            {item.descripcion}
          </Text>

          <Text style={styles.categoria}>{item.categoria}</Text>

          <Text style={styles.precio}>S/ {Number(item.precio).toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.botonAgregar}
          onPress={() => console.log("Producto seleccionado:", item.nombre)}
        >
          <Text style={styles.botonAgregarTexto}>+</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.encabezado}>
        <TouchableOpacity
          style={styles.botonVolver}
          onPress={() => router.back()}
        >
          <Text style={styles.botonVolverTexto}>‹</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.titulo}>Nuestra carta</Text>

          <Text style={styles.subtitulo}>Sanguchería El Chinito</Text>
        </View>
      </View>

      {cargando ? (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#C9342C" />

          <Text style={styles.textoCargando}>Cargando platos...</Text>
        </View>
      ) : (
        <FlatList
          data={platos}
          keyExtractor={(item) => item.id}
          renderItem={mostrarPlato}
          contentContainerStyle={styles.lista}
          ListEmptyComponent={
            <Text style={styles.sinProductos}>
              No hay productos disponibles.
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F1",
  },

  encabezado: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: "#FFF9F1",
    borderBottomWidth: 1,
    borderBottomColor: "#E8DACA",
  },

  botonVolver: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: "#E3D3C1",
  },

  botonVolverTexto: {
    fontSize: 32,
    color: "#3B2921",
    lineHeight: 34,
  },

  titulo: {
    fontSize: 24,
    color: "#3B2921",
    fontWeight: "bold",
  },

  subtitulo: {
    color: "#8A776B",
    fontSize: 13,
    marginTop: 3,
  },

  lista: {
    padding: 18,
  },

  tarjeta: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6D8C7",
    borderRadius: 16,
    padding: 13,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  imagen: {
    width: 72,
    height: 72,
    borderRadius: 14,
    backgroundColor: "#F7E6CF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  emoji: {
    fontSize: 36,
  },

  informacion: {
    flex: 1,
  },

  nombre: {
    color: "#3B2921",
    fontSize: 16,
    fontWeight: "bold",
  },

  descripcion: {
    color: "#79685E",
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },

  categoria: {
    color: "#A28B7D",
    fontSize: 11,
    marginTop: 5,
  },

  precio: {
    color: "#C9342C",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },

  botonAgregar: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#C9342C",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  botonAgregarTexto: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
    lineHeight: 27,
  },

  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  textoCargando: {
    color: "#79685E",
    marginTop: 12,
  },

  sinProductos: {
    color: "#79685E",
    textAlign: "center",
    marginTop: 50,
  },
});
