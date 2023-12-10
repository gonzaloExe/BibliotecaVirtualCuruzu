<!DOCTYPE html>
<html>

<head>
    <title>Carta de presentación</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
    <link rel="stylesheet" href="StyleBotones.css">
    <style>
    </style>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"><i class="fas fa-book text-dark fs-4 me-2"></i>Carta de presentación</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link fw-bold" href="index.html">Inicio</a>
                    </li>
                </ul>
                <form action="" method="get" class="mb-3" id="search-form">
                    <div class="input-group">
                        <input type="text" name="search" placeholder="Buscar por nombre" class="form-control" id="search-input" value="<?php echo isset($_GET['search']) ? $_GET['search'] : '' ?>">
                        <button type="submit" class="btn btn-primary">Buscar</button>
                    </div>
                </form>
            </div>
        </div>
    </nav>
    <hr>
    <?php
    ini_set('memory_limit', '512M');

    use Google\Client;
    use Google\Service\Drive;

    require_once 'api-google/vendor/autoload.php';
    $client = new Google_Client();
    $client->setApplicationName('BibliotecaDefinitiva');
    $client->setScopes(Google_Service_Drive::DRIVE_METADATA_READONLY);
    $client->setAuthConfig('bibliotecadefinitiva-0a72b2b35716.json');
    $service = new Google_Service_Drive($client);
    $folder_id = '1_r6IO3CK4NuvFSBFgeMmLHXRw9wr6SBw';

    // Establecer el número de archivos por página y la página inicial
    $archivosPorPagina = 50;
    $páginaInicial = isset($_GET['page']) ? $_GET['page'] : 1;

    if (isset($_GET['search']) && !empty($_GET['search'])) {
        $search = $_GET['search'];
        $query = "mimeType='application/pdf' and trashed=false and parents in '" . $folder_id . "' and name contains '" . $search . "'";
    } else {
        $query = "mimeType='application/pdf' and trashed=false and parents in '" . $folder_id . "'";
    }

    // Establecer el número de archivos a saltar según la página actual
    $archivosASaltar = ($páginaInicial - 1) * $archivosPorPagina;

    // Recuperar los archivos de la página actual utilizando 'pageSize' y 'pageToken'
    $results = $service->files->listFiles(array(
        'q' => $query,
        'fields' => 'files(name,id)',
        'pageSize' => $archivosPorPagina,
        'pageToken' => $archivosASaltar > 0 ? getArchivosToken($service, $archivosPorPagina, $archivosASaltar) : null,
    ));
    $files = $results->getFiles();

    // Obtener el siguiente token de página para la paginación
    function getArchivosToken($service, $pageSize, $archivosASaltar)
    {
        $results = $service->files->listFiles(array(
            'pageSize' => $pageSize,
            'fields' => 'nextPageToken',
        ));
        $token = $results->getNextPageToken();

        // Calcular el número de páginas a saltar para alcanzar la página actual
        $paginasASaltar = ceil($archivosASaltar / $pageSize);
        for ($i = 1; $i < $paginasASaltar; $i++) {
            $results = $service->files->listFiles(array(
                'pageSize' => $pageSize,
                'pageToken' => $token,
                'fields' => 'nextPageToken',
            ));
            $token = $results->getNextPageToken();
        }
        return $token;
    }
    ?>
    <?php if (empty($files)) : ?>
    <?php else : ?>
        <ul class="list-group">
            <?php foreach ($files as $file) : ?>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <?php echo $file->getName() ?>
                    <div class="d-inline-flex gap-2">
                        <button type="button" class="btn btn-primary btn-sm custom-btn" data-bs-toggle="modal" data-bs-target="#pdfModal<?php echo $file->getId(); ?>">Previsualizar</button>
                        <a href="https://drive.google.com/file/d/<?php echo $file->getId() ?>/view" target="_blank" class="btn btn-primary btn-sm custom-btn">Ver PDF</a>
                    </div>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>
    </div>
    <?php foreach ($files as $file) : ?>
        <div class="modal fade" id="pdfModal<?php echo $file->getId(); ?>" tabindex="-1" aria-labelledby="pdfModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="pdfModalLabel"><?php echo $file->getName(); ?></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <iframe src="https://drive.google.com/file/d/<?php echo $file->getId(); ?>/preview" width="100%" height="600"></iframe>
                    </div>
                </div>
            </div>
        </div>
    <?php endforeach; ?>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.1/js/bootstrap.bundle.min.js"></script>
    <script>
        function submitForm() {
            document.getElementById("search-form").submit();
        }
        document.getElementById("search-input").addEventListener("input", function(event) {
            event.preventDefault();
            if (this.value === "") {
                setTimeout(submitForm, 5000); // Esperar 5 segundos antes de enviar el formulario
            }
        });
    </script>
</body>

</html>