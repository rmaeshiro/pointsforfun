# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
PFF::Application.initialize!
#change from div to span to avoid messing with current layout
ActionView::Base.field_error_proc = Proc.new do |html_tag, instance|
  "<span class=\"field_with_errors\">#{html_tag}</span>".html_safe
end
