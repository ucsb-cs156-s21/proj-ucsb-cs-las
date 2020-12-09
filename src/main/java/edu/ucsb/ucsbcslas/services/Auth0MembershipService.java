package edu.ucsb.ucsbcslas.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import com.auth0.jwt.interfaces.DecodedJWT;
import edu.ucsb.ucsbcslas.entities.Admin;
import edu.ucsb.ucsbcslas.entities.AppUser;
import edu.ucsb.ucsbcslas.repositories.AdminRepository;

import edu.ucsb.ucsbcslas.documents.Login;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import edu.ucsb.ucsbcslas.repositories.LoginsRepository;


/**
 * Service object that determines whether a user is a member of the google org or not.
 */
@Service
public class Auth0MembershipService implements MembershipService {

  private Logger logger = LoggerFactory.getLogger(Auth0MembershipService.class);

  @Value("${app.namespace}")
  private String namespace;

  @Value("${app.admin.emails}")
  final private List<String> adminEmails = new ArrayList<String>();

  @Value("${app.member.hosted-domain}")
  private String memberHostedDomain;

  @Autowired
  private AdminRepository adminRepository;

  @Autowired
  private LoginsRepository loginsRepository;

  /**
   * is current logged in user a member but NOT an admin of the google org
   *
   * @param jwt The decoded JSON Web Token that contains all of the user's claims/information
   * @return if the current jwt corresponds to a member
   */
  @Override
  public boolean isMember(DecodedJWT jwt) {
    updateUserLogins(jwt);
    return hasRole(jwt, "member");
  }

  /**
   * is current logged in user a member of the google org
   *
   * @param jwt The decoded JSON Web Token that contains all of the user's claims/information
   * @return if the current jwt corresponds to an admin
   */
  @Override
  public boolean isAdmin(DecodedJWT jwt) {
    updateUserLogins(jwt);
    return hasRole(jwt, "admin");
  }

  /**
   * is current logged in user has role
   *
   * @param roleToTest "member" or "admin"
   * @return if the current logged in user has that role
   */
  private boolean hasRole(DecodedJWT jwt, String roleToTest) {
    if (jwt == null)
      return false;

    Map<String, Object> customClaims = jwt.getClaim(namespace).asMap();
    String email = (String) customClaims.get("email");
    String hostedDomain = email.substring(email.indexOf("@") + 1);

    logger.info("email=[" + email + "]");
    logger.info("hostedDomain=" + hostedDomain);

    if (roleToTest.equals("admin") && isAdminEmail(email)) {
      return true;
    }

    if (roleToTest.equals("member") && memberHostedDomain.equals(hostedDomain)) {
      return true;
    }

    return false;
  }

  private boolean isAdminEmail(String email) {
    return (!adminRepository.findByEmail(email).isEmpty() || isDefaultAdmin(email));
  }

  private boolean isDefaultAdmin(String email) {
    return adminEmails.contains(email);
  }

  @Override
  public boolean isMember(AppUser user) {
    String email = user.getEmail();
    String hostedDomain = email.substring(email.indexOf("@") + 1);
    return memberHostedDomain.equals(hostedDomain);
  }

  @Override
  public boolean isAdmin(AppUser user) {
    return isAdminEmail(user.getEmail());
  }

  @Override
  public List<String> getDefaultAdminEmails() {
    return adminEmails;
  }


  private void updateUserLogins(DecodedJWT jwt) {
    if (jwt == null) {
      return;
    }
    Map<String, Object> customClaims = jwt.getClaim(namespace).asMap();
    String email = (String) customClaims.get("email");

    Login login = new Login();
    String timestamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS Z").format(Calendar.getInstance().getTime());
    login.setTimestamp(timestamp);
    login.setEmail(email);
    login.setFirstName((String) customClaims.get("given_name"));
    login.setLastName((String) customClaims.get("family_name"));

    logger.info("login = {}", login);

    loginsRepository.save(login);
  }
}

