<?php
/**
* copied from http://wezfurlong.org/blog/2006/nov/http-post-from-php-without-curl/
*/
//
function rest_helper($url, $params = null, $verb = 'GET')
{
  $cparams = array(
    'http' => array(
      'method' => $verb,
      'ignore_errors' => true
    )
  );
  if ($params !== null) {
    $params = http_build_query($params);
    if ($verb == 'POST') {
      $cparams['http']['content'] = $params;
    } else {
      $url .= '?' . $params;
    }
  }

  $context = stream_context_create($cparams);
  $fp = fopen($url, 'rb', false, $context);
  if (!$fp) {
    $res = false;
  } else {
    // If you're trying to troubleshoot problems, try uncommenting the
    // next two lines; it will show you the HTTP response headers across
    // all the redirects:
    // $meta = stream_get_meta_data($fp);
    // var_dump($meta['wrapper_data']);
    $res = stream_get_contents($fp);
  }

  if ($res === false) {
    throw new Exception("$verb $url failed: $php_errormsg");
  }

  return $res;
}
//
//
$params = array();
$url = $_GET["url"];
$verb = $_GET["verb"];

foreach ($_GET as $key => $value) {
  if ($key != "url" && $key != "verb") {
    $params[$key] = $value;
  }
}

if (count($params) == 0) {
  $params = null;
}

echo rest_helper($url, $params, $verb);

// This incomplete snippet demonstrates using POST with the Disqus API
//var_dump(
//  rest_helper(
//    "http://disqus.com/api/thread_by_identifier/",
//    array(
//      'api_version' => '1.1',
//      'user_api_key' => $my_disqus_api_key,
//      'identifier' => $thread_unique_id,
//      'forum_api_key' => $forum_api_key,
//      'title' => 'HTTP POST from PHP, without cURL',
//    ), 'POST'
//  )
//);
?>
