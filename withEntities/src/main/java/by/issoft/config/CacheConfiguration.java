package by.issoft.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache("users", jcacheConfiguration);
            cm.createCache(by.issoft.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(by.issoft.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(by.issoft.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(by.issoft.domain.Community.class.getName(), jcacheConfiguration);
            cm.createCache(by.issoft.domain.Meetup.class.getName(), jcacheConfiguration);
            cm.createCache(by.issoft.domain.Meetup.class.getName() + ".communities", jcacheConfiguration);
            cm.createCache(by.issoft.domain.Meetup.class.getName() + ".speakers", jcacheConfiguration);
            cm.createCache(by.issoft.domain.Image.class.getName(), jcacheConfiguration);
            cm.createCache(by.issoft.domain.Image.class.getName() + ".meetups", jcacheConfiguration);
            cm.createCache(by.issoft.domain.Face.class.getName(), jcacheConfiguration);
            cm.createCache(by.issoft.domain.Face.class.getName() + ".images", jcacheConfiguration);
            cm.createCache(by.issoft.domain.Speaker.class.getName(), jcacheConfiguration);
            cm.createCache(by.issoft.domain.Speaker.class.getName() + ".meetups", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}