<?php

  // Replace contact@example.com with your real receiving email address
  $receiving_email_address = 'soyunallavemagica@gmail.com';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/validate.js' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  
$contact->from_name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
$contact->from_email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
$contact->subject = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
$message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

$contact->add_message($contact->from_name, 'From');
$contact->add_message($contact->from_email, 'Email');
$contact->add_message($message, 'Message', 10);

  $contact->smtp = array(
    'host' => 'smtp.gmail.com',
    'username' => 'soyunallavemagica@gmail.com',
    'password' => 'muaythaihanuman',
    'port' => '587'
  );

  $contact->add_message( $_POST['name'], 'From');
  $contact->add_message( $_POST['email'], 'Email');
  $contact->add_message( $_POST['message'], 'Message', 10);

  echo $contact->send();
?>