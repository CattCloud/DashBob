function getBadgeClase(estado) {
    const clases = {
      pendiente: "bg-yellow-100 text-yellow-800",
      facturado: "bg-blue-100 text-blue-800",
      completado: "bg-green-100 text-green-800",
      devuelto: "bg-gray-100 text-gray-800",
      "saldo a favor": "bg-purple-100 text-purple-800"
    };
    return clases[estado] || "bg-gray-200 text-gray-800";
}