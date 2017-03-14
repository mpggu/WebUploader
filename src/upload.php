<?php

if (isset($_POST['buttonUpload'])) {
  $url = "http://sudocode.me:6767/api/v1/vplan";

  $filedata = mb_convert_encoding(file_get_contents($_FILES['file']['tmp_name']), "UTF-8", "ISO-8859-1");

  if ($filedata != '') {
    $headers = array("Content-Type: application/json", "authorization: " . $_POST['auth']);

    $data = json_encode(array(
      "vplan" => $filedata
    ));


    echo " " . sendPostData($url, $data, $headers);
    return;
  }

  echo "failed";
}

function sendPostData($url, $post, $headers) {
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

  $result = curl_exec($ch);
  curl_close($ch);
  return $result;
}

?>