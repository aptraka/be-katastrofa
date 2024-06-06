const connection = require("./db");

// Handler untuk menambahkan laporan kebencanaan baru
const handleAddReport = async (request, handlers) => {
  const { disasterTypeId, longitude, latitude, incidentTime, description } =
    request.payload;

  const query = `INSERT INTO DisasterReports (disaster_type_id, longitude, latitude, incident_time, description) VALUES (?,?,?,?,?)`;
  const values = [
    disasterTypeId,
    longitude,
    latitude,
    incidentTime,
    description,
  ];

  try {
    await connection.query(query, values);
    const response = handlers.response({
      status: "success",
      message: "Laporan kebencanaan berhasil ditambahkan",
    });
    response.code(201);
    return response;
  } catch (error) {
    console.error("Error adding report:", error);
    const response = handlers.response({
      status: "fail",
      message: "Gagal menambahkan laporan kebencanaan",
      error: error,
    });
    response.code(500);
    return response;
  }
};

// Handler untuk mendapatkan semua laporan kebencanaan
const handleGetAllReports = async (request, handlers) => {
  const query = "SELECT * FROM DisasterReports";

  try {
    const [results] = await connection.query(query);
    const totalData = results.length;

    const response = handlers.response({
      status: "success",
      count: totalData,
      data: {
        reports: results,
      },
    });
    response.code(200);
    return response;
  } catch (error) {
    console.error("Error fetching reports:", error);
    const response = handlers.response({
      status: "fail",
      message: "Gagal mengambil laporan kebencanaan",
    });
    response.code(500);
    return response;
  }
};

// Handler untuk menambahkan jenis bencana baru
const handleAddDisasterType = async (request, handlers) => {
  const { name, description } = request.payload;

  const query = "INSERT INTO DisasterTypes (name, description) VALUES (?, ?)";
  const values = [name, description];

  try {
    await connection.query(query, values);
    const response = handlers.response({
      status: "success",
      message: "Jenis bencana berhasil ditambahkan",
    });
    response.code(201);
    return response;
  } catch (error) {
    console.error("Error adding disaster type:", error);
    const response = handlers.response({
      status: "fail",
      message: "Gagal menambahkan jenis bencana",
    });
    response.code(500);
    return response;
  }
};

// Handler untuk mendapatkan semua jenis bencana
const handleGetAllDisasterTypes = async (request, handlers) => {
  const query = "SELECT * FROM DisasterTypes";

  try {
    const [results] = await connection.query(query);
    const response = handlers.response({
      status: "success",
      data: {
        disasterTypes: results,
      },
    });
    response.code(200);
    return response;
  } catch (error) {
    console.error("Error fetching disaster types:", error);
    const response = handlers.response({
      status: "fail",
      message: "Gagal mengambil jenis bencana",
    });
    response.code(500);
    return response;
  }
};

// Handler untuk mendapatkan laporan kebencanaan berdasarkan ID
const handleGetReportById = async (request, handlers) => {
  const { id } = request.params;

  const query = "SELECT * FROM DisasterReports WHERE id = ?";
  const values = [id];

  try {
    const [results] = await connection.query(query, values);
    if (results.length === 0) {
      const response = handlers.response({
        status: "fail",
        message: "Laporan kebencanaan tidak ditemukan",
      });
      response.code(404);
      return response;
    } else {
      let dataComment = "";
      const queryComment = "SELECT * FROM Comments WHERE idReport = ?";
      const valuesComment = [id];
      try {
        const [resultComments] = await connection.query(
          queryComment,
          valuesComment
        );
        dataComment = resultComments;
      } catch (error) {
        dataComment = error;
      }

      const response = handlers.response({
        status: "success",
        data: {
          report: results[0],
          dataComments: {
            total: dataComment.length,
            comments: dataComment,
          },
        },
      });
      response.code(200);
      return response;
    }
  } catch (error) {
    console.error("Error fetching report by id:", error);
    const response = handlers.response({
      status: "fail",
      message: "Gagal mendapatkan laporan kebencanaan",
    });
    response.code(500);
    return response;
  }
};

// Handler untuk mendapatkan jenis bencana berdasarkan ID
const handleGetDisasterTypeById = async (request, handlers) => {
  const { id } = request.params;

  const query = "SELECT * FROM DisasterTypes WHERE id = ?";
  const values = [id];

  try {
    const [results] = await connection.query(query, values);
    if (results.length === 0) {
      const response = handlers.response({
        status: "fail",
        message: "Jenis bencana tidak ditemukan",
      });
      response.code(404);
      return response;
    }

    const response = handlers.response({
      status: "success",
      data: {
        disasterType: results[0],
      },
    });
    response.code(200);
    return response;
  } catch (error) {
    console.error("Error fetching disaster type by id:", error);
    const response = handlers.response({
      status: "fail",
      message: "Gagal mendapatkan jenis bencana",
    });
    response.code(500);
    return response;
  }
};

const handleAddComment = async (request, handlers) => {
  const { idReport, name, comment } = request.payload;

  const query = `INSERT INTO Comments (id_report, nama, komentar) VALUES (?,?,?)`;
  const values = [idReport, name, comment];

  try {
    await connection.query(query, values);
    const response = handlers.response({
      status: "success",
      message: "Komentar berhasil ditambahkan",
    });
    response.code(201);
    return response;
  } catch (error) {
    console.error("Error adding report:", error);
    const response = handlers.response({
      status: "fail",
      message: "Gagal menambahkan komentar",
      error: error,
    });
    response.code(500);
    return response;
  }
};

// Handler untuk mendapatkan semua berita
const handleGetAllNews = async (request, handlers) => {
  const query = "SELECT * FROM Articles";

  try {
    const [results] = await connection.query(query);
    const totalData = results.length;

    const response = handlers.response({
      status: "success",
      count: totalData,
      data: {
        reports: results,
      },
    });
    response.code(200);
    return response;
  } catch (error) {
    console.error("Error fetching reports:", error);
    const response = handlers.response({
      status: "fail",
      message: "Gagal mengambil laporan kebencanaan",
    });
    response.code(500);
    return response;
  }
};

module.exports = {
  handleAddReport,
  handleGetAllReports,
  handleAddDisasterType,
  handleGetAllDisasterTypes,
  handleGetReportById,
  handleGetDisasterTypeById,
  handleAddComment,
  handleGetAllNews,
};
