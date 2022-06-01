package com.dendeberia.server.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties("app.server")
public class ApplicationConfigurationProperties {

    public ApplicationConfigurationProperties() {
    }

    private String imagesFolderPath;

    public String getImagesFolderPath() {
        return imagesFolderPath;
    }

    public void setImagesFolderPath(String imagesFolderPath) {
        this.imagesFolderPath = imagesFolderPath;
    }
}
