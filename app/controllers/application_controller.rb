class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :authenticate_user!,  :set_cache_buster

  def verify_profile_complete
			if current_user and !current_user.profile_id
				redirect_to  new_profile_path
			end
  end
  def set_cache_buster
    response.headers["Cache-Control"] = "no-cache, no-store, max-age=0, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
  end

  def real_currency (number)
    number_to_currency(number,:delimiter => ".", :unit => "R$ ",:separator => ",")
  end
end
